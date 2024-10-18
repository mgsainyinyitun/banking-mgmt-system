'use client'
import { faUser, faUsers, faUserShield, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import React, { Fragment } from 'react'

interface UserCountCardsProps {
    totalUsers: number;
    totalAdmins: number;
    totalTellers: number;
    totalCustomers: number;
}

const UserCountCards: React.FC<UserCountCardsProps> = ({ totalUsers, totalAdmins, totalTellers, totalCustomers }) => {
    return (
        <Fragment>
            <Card className="bg-content1-900 p-5 rounded-2xl shadow-xl text-primary-400 flex flex-col items-center">
                <CardHeader className="text-2xl font-bold flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="mr-2" />
                    Total Users
                </CardHeader>
                <CardBody className="text-4xl">{totalUsers}</CardBody>
                <CardFooter className="text-sm text-gray-400">All registered users</CardFooter>
            </Card>
            <Card className="bg-content1-900 p-5 rounded-2xl shadow-xl text-primary-400 flex flex-col items-center">
                <CardHeader className="text-2xl font-bold flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Total Customers
                </CardHeader>
                <CardBody className="text-4xl">{totalCustomers}</CardBody>
                <CardFooter className="text-sm text-gray-400">All customers</CardFooter>
            </Card>
            <Card className="bg-content1-900 p-5 rounded-2xl shadow-xl text-primary-400 flex flex-col items-center">
                <CardHeader className="text-2xl font-bold flex items-center">
                    <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                    Total Admins
                </CardHeader>
                <CardBody className="text-4xl">{totalAdmins}</CardBody>
                <CardFooter className="text-sm text-gray-400">Users with administrative privileges</CardFooter>
            </Card>
            <Card className="bg-content1-900 p-5 rounded-2xl shadow-xl text-primary-400 flex flex-col items-center">
                <CardHeader className="text-2xl font-bold flex items-center">
                    <FontAwesomeIcon icon={faUserTie} className="mr-2" />
                    Total Tellers
                </CardHeader>
                <CardBody className="text-4xl">{totalTellers}</CardBody>
                <CardFooter className="text-sm text-gray-400">Users responsible for handling transactions</CardFooter>
            </Card>
        </Fragment>
    )
}

export default UserCountCards