import { Link } from "react-router-dom";
import analyse from '../images/analyse.svg'
import excel from '../images/excel.svg'
import categorise from '../images/category.svg'
import right from '../images/right.svg'
import upload from '../images/upload.svg'

import './description.css'

import { Alert, Button } from '@mui/material';

export function Description(){
    return(
        <div className='description'>
            <div className='title'>
                <h1> Spend Tracker </h1>
            </div>
            <div className="desc">
                <div className='desc-item'>
                    <p>This app is designed to help you understand your spend, which will enable you to take control of it.</p>
                    <p>Each month, you can import your transaction data and quickly categorize it. Afterward, you can store the aggregated data in files of your choosing, compatible with any spreadsheet application.</p>
                </div>
            </div>
            <div className='workflow'>
                <div className='workflow-item'>
                    <img src={excel} alt='excel icon' className='images'/>
                    <p className='icon-desc'>Download bank statements<br/>in excel (CSV) format</p>
                </div>
                <img src={right} alt='right arrow' className='images' />
                <div className='workflow-item'>
                    <img src={upload} alt='upload icon' className='images'/>
                    <p className='icon-desc'>Upload the CSV File</p>
                </div>
                <img src={right} alt='right arrow' className='images' />
                <div className='workflow-item'>
                    <img src={categorise} alt='categorise icon' className='images'/>
                    <p className='icon-desc'>Categorise it with our UI</p>
                </div>
                <img src={right} alt='right arrow' className='images' />
                <div className='workflow-item'>
                    <img src={analyse} alt='analyse icon' className='images'/>
                    <p className='icon-desc'>Generate insights</p>
                </div>
                <img src={right} alt='right arrow' className='images' />
                <div className='workflow-item'>
                    <img src={excel} alt='excel icon' className='images'/>
                    <p className='icon-desc'>Save it locally for future use</p>
                </div>
            </div>
            <Link to="/tracker">
            <Button variant="contained">
            Go to tracker
        </Button>
        </Link>
            <Alert style={{'marginTop':'2em','marginBottom':'5em'}} severity="info">This app has been designed with your privacy and easy of maintenance in mind: <br />
            <ul>
<li>This is just a categorisation tool. We do not offer an option to store your data. <br /></li>
<li>All your data is processed on the frontend (in your browser). Your data will not be sent across the internet anywhere, you can turn the wifi off once this page has fully loaded.<br /></li>
<li>Generic tracking cookie (by Google Analytics) has been used only to see an aggregate of users. <br /></li>
</ul>
    </Alert>
        </div>
    )
}