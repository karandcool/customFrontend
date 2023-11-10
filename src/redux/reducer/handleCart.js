const cart = []

const handleCart = (state=cart, action) =>{
    const product = action.payload
    switch(action.type){
        case "ADDITEM":
            // Check if product already in cart
            const exist = state.find((x) => x.id === product.id)
            if(exist){
                
                // Increase the quantity
                const newstate =  state.map((x)=>x.id ===product.id?{...x, qty: x.qty+1}:x)
                return newstate
            }
            else{

                const newState  = [...state, {...product, qty:1}]

                return newState
            }
            break;
        case "DELITEM":
            const exist2 = state.find((x) => x.id === product.id)
            if(exist2.qty === 1){
                const deleteItem =  state.filter((x)=>x.id!==exist2.id)
                return deleteItem
            }
            else{

                const deleteitem =  state.map((x)=> x.id===product.id?{...x, qty:x.qty-1}:x)
                return deleteitem

            }
            break;

        default:
            return state
            break;
    }
}

export default handleCart