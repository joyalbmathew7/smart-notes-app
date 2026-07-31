import "../styles/navbar.css";

function Navbar(){

    return(

        <header className="navbar">

            <h2>

                Smart Notes

            </h2>

            <div className="navbar-right">

                <input

                placeholder="Search notes..."

                />

                <div className="avatar">

                    J

                </div>

            </div>

        </header>

    )

}

export default Navbar;