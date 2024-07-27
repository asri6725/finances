import Paper from '@mui/material/Paper';
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
                    <h3>Get ahead of your spending</h3>
                </div>
                <div className='desc-item'>
                    <p>This app is designed to help you understand your spending, which will help you become in control of it.</p>
                    <p>Each month, you can import your transaction data and quickly categorise it. After which you can store the aggregate data into files of your choosing: any sheets app.</p>
                </div>
            </div>
            
            <div className='workflow'>
                <div className='workflow-item'>
                    <img src={excel} className='images'/>
                    <p>Download your bank statements in excel (CSV) format</p>
                </div>
                <img src={right} className='images' />
                <div className='workflow-item'>
                    <img src={upload} className='images'/>
                    <p>Upload the CSV File</p>
                </div>
                <img src={right} className='images' />
                <div className='workflow-item'>
                    <img src={categorise} className='images'/>
                    <p>Categorise it with our UI</p>
                </div>
                <img src={right} className='images' />
                <div className='workflow-item'>
                    <img src={analyse} className='images'/>
                    <p>Generate insights</p>
                </div>
                <img src={right} className='images' />
                <div className='workflow-item'>
                    <img src={excel} className='images'/>
                    <p>Save it locally for future use</p>
                </div>
            </div>
            <Button variant="contained" href='/spending-analysis/tracker'>
            Go to tracker
        </Button>
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