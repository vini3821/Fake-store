import { Avatar } from '@mui/material';

interface ProfileAvatarProps {
    size?: number;
}

const ProfileAvatar = ({ size = 80 }: ProfileAvatarProps) => {
    const profileImageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John";

    return (
        <Avatar
            src={profileImageUrl}
            alt="Profile"
            sx={{
                width: size,
                height: size,
                border: '2px solid #f0f0f0'
            }}
        />
    );
};

export default ProfileAvatar;