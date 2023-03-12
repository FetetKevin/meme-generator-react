import { useEffect, useState } from "react";

export default function Main() {
    const [myMeme, setMyMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "./src/assets/images/meme.png",
    });

    const [allMemesImages, setAllMemesImages] = useState([]);

    /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

    useEffect(() => {
        // fetch(`https://api.imgflip.com/get_memes`)
        //     .then((response) => response.json())
        //     .then((data) => setAllMemesImages(data.data.memes));

        // OR

        async function getMemes() {
            const response = await fetch(`https://api.imgflip.com/get_memes`);
            const data = await response.json();
            setAllMemesImages(data.data.memes);
        }
        getMemes();
    }, []);

    const handleGenerateImage = (e) => {
        e.preventDefault();

        let randomNb = Math.floor(Math.random() * allMemesImages.length + 1);

        setMyMeme((prevState) => ({
            ...prevState,
            randomImage: allMemesImages[randomNb].url,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setMyMeme((state) => ({
            ...state,
            [name]: value,
        }));
    };

    return (
        <main>
            <form>
                <div className="input-wrapper">
                    <div className="form-group">
                        <label>Top</label>
                        <input
                            name="topText"
                            type="text"
                            placeholder="shut up"
                            onChange={handleInputChange}
                            value={myMeme.topText}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bottom</label>
                        <input
                            name="bottomText"
                            type="text"
                            placeholder="and take my money"
                            onChange={handleInputChange}
                            value={myMeme.bottomText}
                        />
                    </div>
                </div>

                <button onClick={handleGenerateImage} className="input-submit">
                    Get a new image 💫
                </button>
            </form>

            <div className="generated-img">
                <h2 className="top-text">{myMeme.topText}</h2>
                <h2 className="bottom-text">{myMeme.bottomText}</h2>

                <img src={myMeme.randomImage} alt="" />
            </div>
        </main>
    );
}
