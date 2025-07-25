// Importa React e il hook useState per gestire lo stato locale
import React, { useState } from 'react';

// Array statico dei prodotti disponibili nel negozio
const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
];

const ProductList = () => {
    // Stato per i prodotti aggiunti al carrello (inizialmente vuoto)
    const [addedProducts, setAddedProducts] = useState([]);

    // Funzione chiamata quando si clicca "Aggiungi al carrello"
    const addToCart = (product) => {
        // Controlla se il prodotto è già nel carrello
        const existingProduct = addedProducts.find(p => p.name === product.name);

        if (existingProduct) {
            // Se è già presente, incrementa la quantità
            updateProductQuantity(product.name);
        } else {
            // Altrimenti lo aggiunge con quantità iniziale 1
            setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
        }
    };

    // Incrementa la quantità del prodotto nel carrello
    const updateProductQuantity = (productName) => {
        setAddedProducts(prevProducts =>
            prevProducts.map(p =>
                p.name === productName ? { ...p, quantity: p.quantity + 1 } : p
            )
        );
    };

    // Rimuove completamente un prodotto dal carrello
    const removeFromCart = (productName) => {
        setAddedProducts(prevProducts =>
            prevProducts.filter(p => p.name !== productName)
        );
    };

    // Calcola il totale da pagare sommando prezzo * quantità per ogni prodotto
    const calculateTotal = () => {
        return addedProducts.reduce((total, product) => {
            return total + product.price * product.quantity;
        }, 0);
    };

    // Il componente restituisce il markup da visualizzare
    return (
        <div className="container">
            <h2>Lista Prodotti</h2>

            {/* Lista dei prodotti disponibili */}
            <ul className="product-list">
                {products.map((product, index) => (
                    <li key={index} className="product-item">
                        {/* Nome e prezzo del prodotto */}
                        <span><strong>{product.name}</strong>: €{product.price.toFixed(2)}</span>

                        {/* Bottone per aggiungere al carrello */}
                        <button onClick={() => addToCart(product)} className="add-button">
                            Aggiungi al carrello
                        </button>
                    </li>
                ))}
            </ul>

            {/* Mostra il carrello solo se contiene prodotti */}
            {addedProducts.length > 0 && (
                <div className="cart">
                    <h3>Carrello</h3>

                    {/* Lista dei prodotti nel carrello */}
                    <ul className="cart-list">
                        {addedProducts.map((item, index) => (
                            <li key={index} className="cart-item">
                                {/* Dettagli del prodotto nel carrello */}
                                <span>
                                    <strong>{item.name}</strong> - €{item.price.toFixed(2)} - Quantità: {item.quantity}
                                </span>

                                {/* Bottone per rimuovere il prodotto dal carrello */}
                                <button onClick={() => removeFromCart(item.name)} className="remove-button">
                                    Rimuovi
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Totale da pagare calcolato */}
                    <h4 className="total">Totale da pagare: €{calculateTotal().toFixed(2)}</h4>
                </div>
            )}
        </div>
    );
};

// Esporta il componente per poterlo usare altrove (es. in App.jsx)
export default ProductList;
