import React                from 'react'
import ReactDOM             from 'react-dom'

import Router               from 'universal-router'
import queryString          from 'query-string'


import App                  from 'engine/components/App'
import history              from 'engine/history'

import routes               from 'pages/routes'

const clients = {}
const stores = {}

const context = {
  insertCss: (...styles) => {
    const removeCss = styles.map(x => x._insertCss())
    return () => { removeCss.forEach(f => f()) }
  },

  getClient: (name) => clients[name],
  setClient: (name, client) => clients[name] = client,
  getStore: (name) => stores[name],
  setStore: (name, store) => stores[name] = store,
}

const container = document.getElementById('root')
const router = new Router(routes)

let currentLocation = history.location

async function onLocationChange(location, action) {
  currentLocation = location

  try {
    const route = await router.resolve({
      path: location.pathname,
      query: queryString.parse(location.search),
      context,
    })

    if (currentLocation.key !== location.key) return

    if (route.redirect) {
      history.replace(route.redirect)
      return
    }

    ReactDOM.render(
      <App context={ context }>{ route.component }</App>,
      container
    )
  } catch (error) {
    console.error(error)
  }
}

history.listen(onLocationChange)
onLocationChange(currentLocation)
