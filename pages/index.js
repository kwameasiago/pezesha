import { useEffect, Fragment, useState, useReducer } from 'react';
import MD5 from "crypto-js/md5";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Loader from '../components/Loader/Index';
import { api } from '../axiosConfig';
import { randomString } from '../utils';
import styles from '../styles/Home.module.css';
import Input from '../components/Input';
import CharacterCard from '../components/Cards';
import Pagination from '@mui/material/Pagination';
import BasicModal from '../components/Modal';

const ts = randomString(10);
const hashString = ts + process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY + process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
const hash = MD5(hashString).toString();

const initState = {
  charactersSearch: '',
  characters: { results: [], total: 0, limit: 0 },
  offset: 0,
  total: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHARACTER':
      return {
        ...state,
        charactersSearch: action.payload
      }

    case 'OFFSET':
      return {
        ...state,
        offset: action.payload
      }

    case 'COUNT':
      return {
        ...state,
        count: action.payload
      }

    case 'CHARACTERS':
      return {
        ...state,
        characters: action.payload
      }
    default:
      return state
  }
}

export default function Home() {
  const [isLoader, setisLoader] = useState(false);
  const [modal, setModal] = useState(false)
  const [item, setItem] = useState({
    name: '',
    comics: {},
    events: {},
    series: {},
    stories: {}
  })
  const [state, dispatch] = useReducer(reducer, initState);
  const { charactersSearch, count, offset, characters } = state;


  useEffect(() => {
    let url = '/v1/public/characters?';
    url += '&ts=' + ts;
    url += '&apikey=' + process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
    url += '&hash=' + hash;
    url += '&offset=' + offset
    if (charactersSearch.length > 0) {
      url += '&nameStartsWith=' + charactersSearch
    }

    setisLoader(true)
    api.get(url)
      .then(res => {
        const { data: { data: { results, total, limit } } } = res;
        console.log(results)
        dispatch({ type: 'CHARACTERS', payload: { results, total, limit } });

        setisLoader(false)
      })
      .catch(error => {
        console.log(error)
        setisLoader(false)
      })
  }, [charactersSearch, offset])
  const handleMore = (item) => () => {
    console.log('called')
    setItem(item);
    setModal(true)

    console.log(item)
  }

  return (
    <Fragment>

      <div className={styles.container}>
        <div className={styles.nav}>
          <Box>
            <Grid
              container
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent="center">

              <Grid item xs={6}>
                <Input
                  type="text"
                  lebel={charactersSearch}
                  placeholder="search ..."
                  value={charactersSearch}
                  onChange={(e) => dispatch({ type: 'CHARACTER', payload: e.target.value })}
                />
              </Grid>

              <Grid
                container
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <Pagination count={Math.ceil(characters.total / characters.limit)} onChange={(e, v) => dispatch({ type: 'OFFSET', payload: v === 1 ? 0 : v * 20 })} />
                </Grid>
              </Grid>
            </Grid>
          </Box>

        </div>

        <div className={styles.characterLists}>
          {isLoader ? <Loader width={500} height={500} /> : <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>

              {characters.results.map(item => (
                <Grid item xs={2}>
                  <CharacterCard item={item} handleMore={handleMore} />
                </Grid>))}
            </Grid>
          </Box>}
        </div>
        <BasicModal open={modal} handleClose={() => setModal(false)} content={item} />
      </div>

    </Fragment>
  )
}
