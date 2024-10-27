import { useState } from "react";

const Home = () => {
    const [ruReady, setruReady] = useState(true);

    return <>{ruReady ? <div>Let's get started</div> : <div>Not yet</div>}</>;
};

export default Home;
