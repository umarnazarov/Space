import React, {useState, createContext} from 'react'

export const HamburgerContext = createContext()

function HamburgerProvider(props) {
    const [toggler, setToggler] = useState(false);
    const handleToggler = () => setToggler(!toggler);
    return (
      <HamburgerContext.Provider value={{ toggler, handleToggler, setToggler }}>
        {props.children}
      </HamburgerContext.Provider>
    );
}

export default HamburgerProvider;
