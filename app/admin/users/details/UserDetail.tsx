import React from "react";
import { UserDetail as UserDetailType } from "@/app/types/types";
import Image from "next/image";
import { Card, CardHeader, CardBody, Chip } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, faPhone, faMapMarkerAlt, faIdCard, faBirthdayCake, 
  faUser, faCalendarAlt, faTicketAlt, faUniversity, faMoneyBill, 
  faBalanceScale, faCheckCircle, faTimesCircle, faCalendarCheck, faCalendarTimes 
} from '@fortawesome/free-solid-svg-icons';
import { AccountStatus } from "@prisma/client";

type Props = {
    user: UserDetailType;
};

const UserDetail: React.FC<Props> = ({ user }) => {
    return (
        <div className="container mx-auto p-6">
            <Card className="mb-6">
                <CardHeader className="flex flex-col md:flex-row items-center md:items-start">
                    {user.profileImage ? (
                        <Image
                            src={user.profileImage}
                            alt={`${user.username}'s profile picture`}
                            width={150}
                            height={150}
                            className="rounded-full mb-4 md:mb-0 md:mr-6"
                        />
                    ) : (
                        <div className="w-36 h-36 bg-gray-200 rounded-full mb-4 md:mb-0 md:mr-6 flex items-center justify-center">
                            <span className="text-gray-500 text-3xl">
                                {user.username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                    <div className="w-full">
                        <h2 className="mb-2">
                            <FontAwesomeIcon icon={faUser} className="inline mr-2 text-primary-400" />
                            {user.username}
                        </h2>
                        <p className="text-gray-600 mb-1">
                            <FontAwesomeIcon icon={faEnvelope} className="inline mr-2 text-primary-400" />
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <FontAwesomeIcon icon={faPhone} className="inline mr-2 text-primary-400" />
                            <strong>Phone:</strong> {user.phone}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="inline mr-2 text-primary-400" />
                            <strong>Address:</strong> {user.address}, {user.city}, {user.state}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <FontAwesomeIcon icon={faIdCard} className="inline mr-2 text-primary-400" />
                            <strong>NRC:</strong> {user.nrc}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <FontAwesomeIcon icon={faBirthdayCake} className="inline mr-2 text-primary-400" />
                            <strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <FontAwesomeIcon icon={faUser} className="inline mr-2 text-primary-400" />
                            <strong>Account Type:</strong> {user.type}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <FontAwesomeIcon icon={faCalendarAlt} className="inline mr-2 text-primary-400" />
                            <strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <FontAwesomeIcon icon={faCalendarAlt} className="inline mr-2 text-primary-400" />
                            <strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </CardHeader>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <h3>
                            <FontAwesomeIcon icon={faTicketAlt} className="inline mr-2 text-primary-400" />
                            Number of Tickets
                        </h3>
                    </CardHeader>
                    <CardBody>
                        <p className="text-gray-600 mb-1"><strong>{user._count.Ticket}</strong></p>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>
                        <h3>
                            <FontAwesomeIcon icon={faUniversity} className="inline mr-2 text-primary-400" />
                            Number of Bank Accounts
                        </h3>
                    </CardHeader>
                    <CardBody>
                        <p className="text-gray-600 mb-1"><strong>{user._count.bankAccounts}</strong></p>
                    </CardBody>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <h3>Bank Accounts</h3>
                </CardHeader>
                <CardBody>
                    {user.bankAccounts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {user.bankAccounts.map((account) => (
                                <div key={account.accountNumber} className="flex justify-center">
                                    <Card>
                                        <CardBody>
                                            <p>
                                                <FontAwesomeIcon icon={faMoneyBill} className="inline mr-2 text-primary-400" />
                                                <strong>Account Number:</strong> {account.accountNumber}
                                            </p>
                                            <p>
                                                <FontAwesomeIcon icon={faUser} className="inline mr-2 text-primary-400" />
                                                <strong>Account Name:</strong> {account.account_name}
                                            </p>
                                            <p>
                                                <FontAwesomeIcon icon={faBalanceScale} className="inline mr-2 text-primary-400" />
                                                <strong>Account Type:</strong> {account.accountType}
                                            </p>
                                            <p>
                                                <FontAwesomeIcon icon={faMoneyBill} className="inline mr-2 text-primary-400" />
                                                <strong>Balance:</strong> ${account.balance.toFixed(2)}
                                            </p>
                                            <p>
                                                <FontAwesomeIcon icon={faMoneyBill} className="inline mr-2 text-primary-400" />
                                                <strong>Available Balance:</strong> ${account.availableBalance.toFixed(2)}
                                            </p>
                                            <div className="flex items-center">
                                                <FontAwesomeIcon 
                                                    icon={account.accountStatus === AccountStatus.ACTIVE ? faCheckCircle : faTimesCircle} 
                                                    className="inline mr-2 text-primary-400" 
                                                />
                                                <strong>Status:</strong>
                                                <Chip 
                                                    color={account.accountStatus === AccountStatus.ACTIVE ? "success" : "default"} 
                                                    className="ml-2"
                                                >
                                                    {account.accountStatus}
                                                </Chip>
                                            </div>
                                            <p>
                                                <FontAwesomeIcon icon={faCalendarCheck} className="inline mr-2 text-primary-400" />
                                                <strong>Opened At:</strong> {new Date(account.accountOpenedAt).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <FontAwesomeIcon icon={faCalendarTimes} className="inline mr-2 text-primary-400" />
                                                <strong>Closed At:</strong> {account.accountClosedAt ? new Date(account.accountClosedAt).toLocaleDateString() : "N/A"}
                                            </p>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No bank accounts available.</p>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default UserDetail;
