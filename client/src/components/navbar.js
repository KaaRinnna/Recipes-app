import {useNavigate, Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Button} from "@nextui-org/react";

export const Navigation = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

    const links = [
        {"link": "/", "title": "Home"},
        {"link": "/create-recipe", "title": "Create recipe"},
    ]

    return (
        <Navbar disableAnimation isBordered>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">Recipes by Kar</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">Recipes by Kar</p>
                </NavbarBrand>

                {links.map((obj) => (
                    <NavbarItem>
                        <Link className="link" to={obj.link}>{obj.title}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                    {!cookies.access_token ? (<>
                        <NavbarItem className="hidden sm:flex">
                            <Link to="/auth">Login</Link>
                        </NavbarItem>

                        <NavbarItem className="hidden sm:flex">
                            <Link to="/auth">Sign Up</Link>
                        </NavbarItem></>
                        
                    ) : (
                        <NavbarItem className="hidden lg:flex gap-4">
                            <Link to="saved-recipe" className="link">Saved recipes</Link>
                            <button onClick={logout}>Logout</button>
                        </NavbarItem>
                    )}
            </NavbarContent>

            <NavbarMenu>
                {links.map((obj) => (
                <NavbarMenuItem>
                    <Link className="w-full" to={obj.link}>
                        {obj.title}
                    </Link>
                </NavbarMenuItem>))}

                
                    {!cookies.access_token ? (
                        <NavbarMenuItem><Link to="/auth">Login</Link></NavbarMenuItem>
                        
                    ) : (
                        <NavbarMenuItem>
                            <Link to="saved-recipe">Saved recipes</Link>
                            <button onClick={logout}>Logout</button>
                        </NavbarMenuItem>
                        
                        
                        
                        
                    )}
                
                
                
            </NavbarMenu>

        </Navbar>
    
    )
}