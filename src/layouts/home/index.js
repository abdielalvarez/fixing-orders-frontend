import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import OrderCard from '../../components/Cards';
import { getOrders, updateOrder } from '../../store/actions/order';
import Modal from '../../components/Modal';

const Home = ({ orders, getOrders, updateOrder }) => {

    const handleMaintain = async data => {
        handleClose()
        if (data.inMaintenance) {
            let body = {
                ...data,
                inMaintenance: false
            }
            await updateOrder(body, orders)
        } else {
            handleOpen()
            setData(data)
        }
    }

    const [ data, setData ] = useState({})
    const [ open, setOpen ] = useState({})

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        getOrders()
    }, [orders])

    return (
        <div>
            {open ? <Modal data={data} handleClose={handleClose} /> : null}
            <h1 className="text-success mb-10 mt-3 container text-center">See your orders</h1>
            <div
                className="row row-cols-1 row-cols-md-3 g-4 container mt-5 d-flex justify-center"
                style={{
                    margin: '0 auto'
                }}
            >
                {orders && orders.length && orders.length > 0 ?
                    orders.map((elem, index) => {
                        return (
                            <OrderCard
                                key={index}
                                data={elem}
                                handleMaintain={handleMaintain}
                            />
                        )
                    }) : null
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    orders: state.order.orders,
})

const mapDispatchToProps = dispatch => ({
    getOrders: () => dispatch(getOrders()),
    updateOrder: (body, orders) => dispatch(updateOrder(body, orders))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
