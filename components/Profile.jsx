const user = {
  name: 'Hedy Lamar',
  imageUrl: 'https://i.imgur.com/yXOVDOSs.jpg',
  imagesize: 90,
}

export default function Profile () {
  return (
    <>
      <h1>{user.name}</h1>
      <img 
        className="avatar"
        src="{user.imageUrl}" 
        alt={'Photo of ' + user.name}
        style={{
          width: user.imagesize,
          height: user.imageSize
        }}
      />
    </>    
  );
}