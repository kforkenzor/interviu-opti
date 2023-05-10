import './App.css'
import countVisitsByType from './counters/visitCounter'
import countLikesByType from './counters/likeCounter'
import countSalesByType from './counters/saleCounter'
import transformVisitsToTopVisits from './transformers/topVisits'
import transformSalesToTopSales from './transformers/topSales'
import transformLikesToTopLikes from './transformers/topLikes'
import AnalysisItem from './components/AnalysisItem'

import { useCallback, useMemo } from 'react'

function App() {
  const actions = useMemo(
    () => [
      {
        id: 1,
        type: 'vanzare',
        value: 10,
        time: '2022-06-14 08:37:28',
        prod: 112,
      },
      {
        id: 2,
        type: 'like',
        value: 6,
        time: '2022-07-24 11:22:03',
        prod: 133,
      },
      {
        id: 3,
        type: 'vizita',
        value: 12,
        time: '2022-10-07 17:51:17',
        prod: 167,
      },
      {
        id: 4,
        type: 'vanzare',
        value: 8,
        time: '2022-11-16 22:15:29',
        prod: 156,
      },
      {
        id: 5,
        type: 'like',
        value: 3,
        time: '2022-09-28 01:44:12',
        prod: 151,
      },
      {
        id: 6,
        type: 'like',
        value: 3,
        time: '2022-09-28 01:44:12',
        prod: 151,
      },
      {
        id: 7,
        type: 'vanzare',
        value: 18,
        time: '2022-08-12 14:53:06',
        prod: 151,
      },
      {
        id: 8,
        type: 'vizita',
        value: 5,
        time: '2022-05-19 09:27:51',
        prod: 133,
      },
      {
        id: 9,
        type: 'like',
        value: 11,
        time: '2022-12-02 23:59:34',
        prod: 191,
      },
      {
        id: 10,
        type: 'vanzare',
        value: 99,
        time: '2022-06-30 17:38:47',
        prod: 137,
      },
      {
        id: 11,
        type: 'vanzare',
        value: 100,
        time: '2022-05-30 17:38:47',
        prod: 137,
      },
      {
        id: 12,
        type: 'vanzare',
        value: 15,
        time: '2022-06-14 08:37:28',
        prod: 110,
      },
      {
        id: 13,
        type: 'like',
        value: 5,
        time: '2022-07-24 11:22:03',
        prod: 120,
      },
      {
        id: 14,
        type: 'vizita',
        value: 10,
        time: '2022-10-07 17:51:17',
        prod: 130,
      },
      {
        id: 15,
        type: 'vanzare',
        value: 12,
        time: '2022-11-16 22:15:29',
        prod: 151,
      },
      {
        id: 16,
        type: 'like',
        value: 8,
        time: '2022-09-28 01:44:12',
        prod: 151,
      },

      {
        id: 17,
        type: 'vizita',
        value: 3,
        time: '2022-12-30 23:59:59',
        prod: 200,
      },
      {
        id: 18,
        type: 'like',
        value: 10,
        time: '2022-07-23 11:22:03',
        prod: 120,
      },
      {
        id: 19,
        type: 'vizita',
        value: 10,
        time: '2022-10-08 17:51:17',
        prod: 130,
      },
      {
        id: 20,
        type: 'vanzare',
        value: 12,
        time: '2022-11-15 22:15:29',
        prod: 140,
      },
      {
        id: 21,
        type: 'like',
        value: 8,
        time: '2022-10-28 01:44:12',
        prod: 150,
      },

      {
        id: 22,
        type: 'vizita',
        value: 3,
        time: '2022-11-31 23:59:59',
        prod: 200,
      },
    ],
    []
  )

  const visitsByType = useMemo(() => countVisitsByType(actions), [actions])
  const likesByType = useMemo(() => countLikesByType(actions), [actions])
  const salesByType = useMemo(() => countSalesByType(actions), [actions])
  const topVisits = useMemo(
    () => transformVisitsToTopVisits(visitsByType),
    [visitsByType]
  )
  const topSales = useMemo(
    () => transformSalesToTopSales(salesByType),
    [salesByType]
  )
  const topLikes = useMemo(
    () => transformLikesToTopLikes(likesByType),
    [likesByType]
  )
  const generateAnalysis = useCallback((topSales) => {
    // Sort topSales array by prod
    const sortedTopSales = topSales.sort((a, b) => a.prod - b.prod)

    const analysisList = []

    for (let i = 0; i < sortedTopSales.length; i++) {
      const currentSale = sortedTopSales[i]
      const previousSale = sortedTopSales[i - 1]

      if (
        previousSale &&
        currentSale.prod === previousSale.prod &&
        currentSale.type_top === previousSale.type_top
      ) {
        const trend = getTrend(
          currentSale.sumofvalues,
          previousSale.sumofvalues
        )

        const analysis = `Produsul numarul ${currentSale.prod} este ${trend} comparativ cu perioada anterioara.`
        analysisList.push(analysis)
      }
    }

    return analysisList
  }, [])

  function getTrend(currentValue, previousValue) {
    if (currentValue > previousValue) {
      return 'in crestere'
    } else if (currentValue < previousValue) {
      return 'in scadere'
    } else {
      return 'la aceelasi nivel'
    }
  }

  const analysisSalesList = useMemo(
    () => generateAnalysis(topSales),
    [topSales, generateAnalysis]
  )

  //procedam la fel si pentru analysisVisitsList, analysisLikesList arrays in functie de analiza comparativa pe care o dorim, mapand vectorii intr-o lista dinamica la fel ca mai jos

  const analysisVisitsList = useMemo(
    () => generateAnalysis(topVisits),
    [topVisits, generateAnalysis]
  )
  const analysisLikesList = useMemo(
    () => generateAnalysis(topLikes),
    [topLikes, generateAnalysis]
  )

  return (
    <ul>
      {analysisSalesList.map((analysis, index) => (
        <AnalysisItem analysis={analysis} key={index} />
      ))}
    </ul>
  )
}

export default App

//sunt render-uite de cate doua ori intrucat din neatentie am creat un
//singur vector pentru fiecare dintre topuri
//ex: la topul sales am in acelasi vector si topul lunar, si cel
//saptamanal si cel anual si le compara din vectorul de dummy_actions
//atat pentru luna cat si saptamana afisandu-le de 2 ori
//puteam sa fac codul si mai modular, sa creez o componenta de afisare
//pentru lista AnalysisList.jsx care sa primeasca vectorul prin props
//si sa-l mapeze in AnalysisItem.jsx, dar am zis sa nu ma mai complic :)
