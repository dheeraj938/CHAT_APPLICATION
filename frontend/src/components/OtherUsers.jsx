import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux';

const OtherUsers = () => {
    useGetOtherUsers();
    const { otherUsers, searchInput } = useSelector(store => store.user);

    // Always show all users by default, but put matching users at the top when searching
    const displayUsers = otherUsers && otherUsers.length > 0 ? (() => {
        if (!searchInput || searchInput.trim() === '') {
            // No search - show all users
            return otherUsers;
        }
        
        // Search active - show matching users first, then non-matching
        const searchLower = searchInput.toLowerCase();
        const matchedUsers = [];
        const unmatchedUsers = [];
        
        otherUsers.forEach((user) => {
            const matchesFullName = user?.fullName?.toLowerCase().includes(searchLower);
            const matchesUsername = user?.username?.toLowerCase().includes(searchLower);
            
            if (matchesFullName || matchesUsername) {
                matchedUsers.push(user);
            } else {
                unmatchedUsers.push(user);
            }
        });
        
        return [...matchedUsers, ...unmatchedUsers];
    })() : [];

    if (!otherUsers || otherUsers.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 text-xs sm:text-sm">No users available</p>
            </div>
        );
    }

    if (displayUsers.length === 0 && searchInput) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 text-xs sm:text-sm">No users found with "{searchInput}"</p>
            </div>
        );
    }

    return (
        <div className="space-y-1 sm:space-y-2">
            {displayUsers?.map((user) => (
                <OtherUser key={user._id} user={user} isOnline={false} />
            ))}
        </div>
    )
}

export default OtherUsers
