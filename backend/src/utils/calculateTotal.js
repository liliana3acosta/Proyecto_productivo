const calculateTotal = (items) => {

    return items.reduce(
        (total, item) => total + (item.cantidad * item.precio),
        0
    );

};

export default calculateTotal;
