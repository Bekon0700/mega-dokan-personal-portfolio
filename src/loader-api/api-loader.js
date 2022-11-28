export const doubleLoader = async ({params}) => {
    const res = await fetch('https://inventory-rest-api.vercel.app/api/v1/products/category')
    const { categories } = await res.json()

    const res2 = await fetch(`https://inventory-rest-api.vercel.app/api/v1/products/category/${params.id}`)
    const { products } = await res2.json()
    
    console.log(categories, products)

    return {
        categories,
        products
    }
}