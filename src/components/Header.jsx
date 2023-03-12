import Logo from "../assets/images/trollface.png";

export default function Header() {
    return (
        <header>
            <img src={Logo} alt="" />
            <h2>Meme generator</h2>
            <h4>React Course - Project 3</h4>
        </header>
    );
}
