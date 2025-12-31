import React from 'react'
import UserPanelLayout from "../UserPanelLayout"
import AccountDetail from '@/components/template/account/account-detail/accountDetail'
export default function page() {
    return (
        <UserPanelLayout>
            <h4 className='fw-bold'
                style={{ color: "var(--brown-light)", marginBottom: "1rem" }}>
                Detail Account
            </h4>
            <div className="transparentCard">
                <AccountDetail />
            </div>
        </UserPanelLayout>
    )
}
