import React from "react";
import "./index.css";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from "firebase/compat/app";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };

    this.db = firebase.firestore();
    console.log("DATABASE", this.db);
  }

  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection("products")
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);

    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data());
    //     });

    //     const products = snapshot.docs.map((doc) => {

    //       const data = doc.data();
    //       data['id'] = doc.id;
    //       return data;
    //     })

    //     this.setState({
    //       products : products,
    //       loading: false
    //     })

    //   })

    this.db
      .collection("products")
      .orderBy("price", "desc")
      .onSnapshot((snapshot) => {
        console.log("THIS IS THE SNAPSHOT", snapshot);

        snapshot.docs.map((doc) => {
          console.log(doc.data());
        });

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        this.setState({
          products: products,
          loading: false,
        });
      });
  }

  handleIncreaseQuantity = (product) => {
    // console.log('Hey please increase the quantity of', product);
    const { products } = this.state;
    const index = products.indexOf(product);
    console.log("INDEX", index);

    const docRef = this.db.collection("products").doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty + 1,
      })
      .then(() => {
        console.log("Updated Successfully");
      })
      .catch((error) => {
        console.log("Error :", error);
      });

    // products[index].qty += 1 ;

    // this.setState({
    //     // if key and value have same name then we can use shorthand too that is .... products
    //     products:products
    // })
  };

  handleDecreaseQuantity = (product) => {
    // console.log('Hey please increase the quantity of', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    const docRef = this.db.collection("products").doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then(() => {
        console.log("Updated Successfully");
      })
      .catch((error) => {
        console.log("Error :", error);
      });

    // products[index].qty -= 1 ;

    // this.setState({
    //     // if key and value have same name then we can use shorthand too that is .... products
    //     products:products
    // })
  };

  handleDeleteProduct = (id) => {
    console.log("IIIIIIIIIIIIIIIIIIDDDDDDDDDDDDDDDDDDDD", id);
    const { products } = this.state;

    const docRef = this.db.collection("products").doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("Deleted Successfully");
      })
      .catch((error) => {
        console.log("Error :", error);
      });

    // const items = products.filter((item) => item.id != id); // this will give me the array of products whose id's are diff

    // this.setState({
    //     products: items
    // })
  };

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  };

  getCartTotal = () => {
    const { products } = this.state;

    let sum = 0;

    products.map((product) => {
      sum = sum + product.qty * product.price;
    });

    return sum;
  };

  addProduct = () => {
    this.db
      .collection("products")
      .add({
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzTYYgHkBBLKU_1g2lMGJWB3N4Un3aOJv0Wg&usqp=CAU",
        qty: 4,
        price: 40000,
        title: "Washing Machine",
      })
      .then((docRef) => {
        console.log("Product has been added", docRef);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button style={{ padding: 10, fontSize: 20 }} onClick={this.addProduct}>
          Add Product
        </button> */}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 20, fontSize: 20 }}>
          Total: {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
