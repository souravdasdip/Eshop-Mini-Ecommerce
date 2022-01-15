export const initialState = {
    basket: [],
    user:null,
    products: [],
    orders:[]
};

// Get Busket Total Amount Prize of Items
export const getBasketTotal = (basket) => 
basket?.reduce((amount, item) => (item.price) + amount, 0);

export const fetchUserOrders = (order) =>
order?.map((item) => item );

// Everything data layer as state and manupulate data layer by action
const reducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            }
        
        case "SUCCESS_CHECKOUT":
            return{
                ...state,
                basket: action.basket
            }

        case "SET_PRODUCTS":
            return{
                ...state,
                products: action.products
            }

        case 'ADD_TO_BASKET':
            // Login to adding item to basket
            // let tempCart = [...state.basket];
            // const selectProduct = tempCart.find(item => item.id === action.item.id)
            // if(selectProduct){
            //     const itemIndex = tempCart.indexOf(selectProduct);
            //     const product = tempCart[itemIndex];
            //     product.count = product.count + 1;
            //     return {
            //         ...state,
            //         basket: tempCart
            //     }
            // }else{
            //     return { 
            //         ...state,
            //         basket: [...state.basket, action.item] 
                    
            //     }
            // }
            
            return { 
                ...state,
                basket: [...state.basket, action.item] 
                
            }
            break;
        case 'REMOVE_TO_BASKET': 
            // Login to removing item to basket
            let newBasket = [...state.basket];

            const index = state.basket.findIndex((basketItem) => 
                basketItem.id === action.id
            )

            if(index >= 0){
                // Item exists in basket, remove it...
                newBasket.splice(index, 1);
            }else{
                console.warn(`Can't remove product id: ${action.id}`);
            }

            return { ...state, basket: newBasket };
            break;
        default:
            return state;
    }
    
}


export default reducer;