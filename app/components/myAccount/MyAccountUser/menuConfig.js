export default (menuConfig = [
    {
        title: 'Change Name and Last Name',
        iconType: 'material-community',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        iconNameLeft: 'account-circle',
        iconColorLeft: '#ccc',
        onPress: () => console.log('press in change name')
        
    },
    {
        title: 'Change Email',
        iconType: 'material-community',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        iconNameLeft: 'at',
        iconColorLeft: '#ccc',
        onPress: () => console.log('press in change email')
        
    },
    {
        title: 'Change Password',
        iconType: 'material-community',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        iconNameLeft: 'lock-reset',
        iconColorLeft: '#ccc',
        onPress: () => console.log('press in change password')
        
    }
])