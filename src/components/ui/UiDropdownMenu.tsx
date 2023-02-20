import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Link } from 'react-router-dom';
interface Data {
    value?: string | null;
    type?: string;
    href?:string ;
    display?:string | null;
    path?: string;
    subItems?: Data[];
    function?: () => void
}

interface Props {
    data: Data[]
}

export default function UidropdownMenu ({data}: Props) {
    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
            {
                data.map((option)=>(
                    <>
                        { option.type === "route" && 
                        <MenuItem>
                            <Link to={`${option.path}`}>{option.display}</Link>
                        </MenuItem> }

                        {option.type === "link" && <MenuItem href={option.href}>{option.display}</MenuItem>}

                        {option.type === "function" && <MenuItem onClick={option.function}>{option.display}</MenuItem>}

                        {option.type === "subItem" && 
                        <SubMenu label={option.display}>
                            { option.subItems?.map((subItem)=>(
                                <>
                                    { option.type === "route" && 
                                    <MenuItem>
                                        <Link to={`${subItem.path}`}>{subItem.display}</Link>
                                    </MenuItem> }

                                    {subItem.type === "link" && <MenuItem href={subItem.href}>{subItem.display}</MenuItem>}

                                    {subItem.type === "functon" && <MenuItem onClick={subItem.function}>{subItem.display}</MenuItem>}
                                </>
                            ))}
                        </SubMenu>}
                    </>
                ))
            }
        </Menu>
    )
}