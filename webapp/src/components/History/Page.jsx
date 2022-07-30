import React from 'react';
import axios from 'axios';

const Page = function() {

    const games = axios.get("http://localhost:8080/");
    return (
        <div>

        </div>
    );
};

export default Page;