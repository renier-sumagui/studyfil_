import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeHeaderCss } from 'stylesheets/home/';
import classnames from 'classnames';
import SearchIcon from '@mui/icons-material/Search';
import { useUserContext } from 'context/';
import { Notification } from './notification';
import { NotificationContextProvider } from 'src/context';

export function HomeHeader() {
    const [keyword, setKeyword] = useState('');
    const searchTypeRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useUserContext();

    function handleSubmit(e) {
        e.preventDefault();
        const searchType = searchTypeRef.current.value;
        if (keyword) {
            navigate(`/groups/search?${searchType}=${keyword}&user=${user.id}`);
        } else {
            return;
        }
    }

    return (
        <header className={classnames(HomeHeaderCss.homeHeader, 'justifySpaceBetween')}>
            <img src="/img/logo2.png" width="200px"/>
            <form className='flex gap5' onSubmit={handleSubmit}>
                <select ref={searchTypeRef} name="category" className={classnames(HomeHeaderCss.select, 'radius5')}>
                    <option value="topic">Topic</option>
                    <option value="group">Group</option>
                </select>
                <div className={classnames(HomeHeaderCss.searchContainer, 'alignCenter', 'flex', 'radius5')}>
                    <SearchIcon />
                    <input 
                        value={keyword} 
                        type="text" 
                        placeholder="Search" 
                        style={{ border: 'none', outline: 'none', fontSize: '18px' }} 
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </form>
            <NotificationContextProvider>
                <Notification />
            </NotificationContextProvider>
        </header>
    )
}