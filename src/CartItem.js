import React from 'react';


const CartItem = (props) => {


        
        const {price,title,qty} = props.product;
        const { product ,
                onIncreaseQuantity, 
                onDecreaseQuantity,
                onDeleteProduct} = props;
        return(
            <div className="cart-item">
                <div className="left-block"> 
                    <img style={styles.image} src={product.img}></img>
                </div>
                <div className="right-block"> 
                    <div style={{fontSize:25}}> {title}</div>
                    <div style={{color:'#777'}}> Rs {price}</div>
                    <div style={{color:'#777'}}> Qty: {qty}</div>
                    <div className='cart-item-actions'>
                        {/* Buttons */}
                        <img alt='increase'
                         className='actions-icons' 
                         src='https://img.icons8.com/ios-filled/344/plus.png'
                         onClick={() => onIncreaseQuantity(product)}

                         /> 

                        <img alt='decrease' 
                        className='actions-icons'
                        src='https://img.icons8.com/ios-filled/344/minus.png' 
                        onClick={() => onDecreaseQuantity(product)}
                        />
                        

                        <img alt='delete' 
                        className='actions-icons' 
                        src='https://img.icons8.com/ios-glyphs/344/filled-trash.png' 
                        onClick={() => onDeleteProduct(product.id)}
                        />
                        
                    </div>
                    

                </div>


            </div>

        );
    
}


const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius:4,
        background:'#ccc'
    }
}

export default CartItem;