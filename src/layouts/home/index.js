import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { connect } from 'react-redux';
import AutoCards from '../../components/Cards';

const Home = ({ user }) => {

    const array = [1, 2, 3, 4]

    const history = useHistory()

    useEffect(() => {
        if (!user) {
            history.push('/sign-in')
        }
    }, [])

    const handleMaintain = (data) => {
        console.log('data', data);
    }

    return (
        <div>
            <Navbar />
            <h3 className="text-success mb-5 mt-3 ml-3">Vea su catálogo</h3>
            <div className="row row-cols-1 row-cols-md-3 g-4 container mt-5 d-flex justify-center">
                {array && array.length && array.length > 0 ?
                    array.map((elem, index) => {
                        return (
                            <AutoCards key={index} handleMaintain={handleMaintain} />
                        )       
                    }) : null
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user && state.user.user ? state.user.user : null
})

export default connect(mapStateToProps, null)(Home);
