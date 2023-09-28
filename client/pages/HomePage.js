import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../components/cardSlice';
import DisplayFolder from '../components/displayFolder';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { resetQuizBooleans } from '../components/cardSlice';



const HomePage = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
        dispatch(resetQuizBooleans())
    }, []);

    const categories = useSelector((state) => state.store.categories);
    const isCategoriesFetched = useSelector((state) => state.store.isCategoriesFetched);
    //console.log(categories);

    const categoriesArray = categories.map((category, index) => {
        return (
            <div key={index}>
                <DisplayFolder class='DisplayFolder' category={category} />
                <br />
            </div>
        )
    });

    const defaultEditorEndpoint = 'defaultCategory';
    return (
        <div>
            <div>
                <h1 class='title'> Study Cards v2 </h1>
                <Button variant="outlined" size="small">
                    <Link to={`/editor/${defaultEditorEndpoint}`}>
                        Create New Cards
                    </Link>
                </Button>
                <br></br><br></br>
            </div>
            <div class='DisplayFolder'>
            {
                !isCategoriesFetched ? <p>Loading!</p> :
                    categoriesArray
            }
            </div>
        </div>
    );

};

export default HomePage;