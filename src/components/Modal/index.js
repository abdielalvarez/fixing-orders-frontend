import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../../store/actions/order';

const ModalForm = ({ data, updateOrder, orders, handleClose }) => {

    const [ loading, setLoading ] = useState(false)

    const [ nameToDeliver, setNameToDeliver ] = useState('')
    const [ estimateDate, setEstimateDate ] = useState('')
    const [ error, setError ] = useState('')

    const onNameChange = e => {
        setNameToDeliver(e.target.value)
    }

    const onDateChange = e => {
        setEstimateDate(e.target.value)
    }

    const processDate = date => {
        if (date && typeof date === 'string') {
            let dArray = date.split('-');
            let newDate = new Date(dArray[0], dArray[1], dArray[2]).getTime() / 1000;
            if (newDate && typeof newDate === 'number' && newDate > 0) {
                return newDate;
            } else {
                return
            }
        } else {
            return
        }
    }

    const handleRequest = async e => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const date = processDate(estimateDate)
        if (!date) {
            setError('The date you entered is invalid')
            return
        }
        
        if (nameToDeliver && date) {
            const body = {
                ...data,
                nameToDeliver,
                estimateDate: date,
                inMaintenance: true
            }
            try {
                await updateOrder(body, orders)
                const modal = document.getElementById('formModal')
                setLoading(false)
                handleClose()
                modal.classList.remove('show');
                modal.setAttribute('aria-hidden', 'true');
                modal.setAttribute('style', 'display: none');
                const modalBackdrops = document.getElementsByClassName('modal-backdrop');
                document.body.removeChild(modalBackdrops[0]);
                const modalElem = document.getElementsByClassName('modal-open');
                document.body.removeChild(modalElem[0]);
                const modalElem2 = document.getElementsByClassName('modal-dialog');
                document.body.removeChild(modalElem2[0]);
                const modalElem3 = document.getElementsByClassName('modal');
                document.body.removeChild(modalElem3[0]);
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
    }

    return (
        <div>
            <div className="modal fade" id="formModal" tabIndex="-1" role="dialog" aria-labelledby="formModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="formModalLabel">Complete requested data to apply order</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {error ?
                        <div className="alert alert-danger mb-3 mt-2" role="alert">
                            {error}
                        </div> : null
                    }
                    <form onSubmit={handleRequest}>
                        <div className="form-group">
                            <label htmlFor="nameToDeliver" className="col-form-label">Client Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nameToDeliver"
                                onChange={onNameChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="estimateDate" className="col-form-label">Delivery Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="estimateDate"
                                onChange={onDateChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="id" className="col-form-label">Order Id (Not editable field)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="id"
                                value={data.id}
                                disabled={true}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary">Apply order</button>
                            {loading ?
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : null
                            }
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    orders: state.order.orders,
})

const mapDispatchToProps = dispatch => ({
    updateOrder: (body, orders) => dispatch(updateOrder(body, orders))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);