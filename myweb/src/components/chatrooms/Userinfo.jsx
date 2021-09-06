import { Avatar, Typography } from 'antd'
import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { auth, db } from '../../firebae/config'
import { AuthContext } from '../../context/AuthProvider'
import { useHistory } from 'react-router-dom'
const WrapperStyled = styled.div`
    display:flex;
    justify-content:space-between;
    padding : 12px 16px;
    border-bottom: 1px solid rgba(82,38,83);
    .Username{
        color:white;
        margin-left: 5px;
    }
`

export default function Userinfo() {
    const history = useHistory()
    const { user: {
        displayName, photoURL
    } } = React.useContext(AuthContext)


    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className='Username'>{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => { auth.signOut(); history.push('/login') }}> Đăng Xuất</Button>
        </WrapperStyled>
    )
}
