import React, { Fragment, useContext, useEffect } from 'react'
import compras from '../../info/compras'

import { GlobalContext } from '../../context/TestState'

/* 
Products: Displays the content of the ​compras.json​ file (see below) in a responsive table, 
centered both horizontally and vertically, that should be able to be displayed properly 
in a width of 300px or greater. The table should include a header with a different style 
than the content’s rows.
*/

const Products = () => {
  const { convertToArray, products } = useContext(GlobalContext)

  useEffect(() => {
    convertToArray(compras)
    // eslint-disable-next-line
  }, [])

  return(
    <Fragment>
      <div className='product-grid-container'>

        <div className="product-grid-container-header" style={{ backgroundColor: 'green' }}>
          List of products
        </div>

        {products.map(prod => <div key={products.indexOf(prod)}>
            {prod.map(row => <p key={prod.indexOf(row)}>
                {row[0].replace(row[0].charAt(0), row[0].charAt(0).toUpperCase())}: {row[1]}
              </p>
            )}
          </div>
        )}

      </div>
    </Fragment>
  )
}

export default Products
