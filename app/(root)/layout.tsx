import {ReactNode} from 'react';
import Navbar from '@/components/Navbar';

const layout = ({children}: Readonly<{ children: ReactNode }>) => {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    );
};

export default layout;
