import React from 'react';
import Picture from '../Picture/Picture';
import Display from '../Display/Display';

const Art = () => {
  
    return (
        <>
        {/* liam portrait */}
        {/* <Picture 
            url={"http://madcamp.dhki.kr/images/dongha.jpg"}
            scale={[4, 4, 4]}
            position={[34.7, 7, 0]}            
            rotation={[0, -Math.PI / 2, 0]}
            metalness={0.9}
            roughness={0.9}
        />
        <Display position={[20, 5, 0]} size={[1, 18, 11]} /> */}

        <Picture 
            url={"assets/3D/Image/scene.gltf"}
            scale={[4, 3.5, 4]}
            position={[34.7, 10, 12]}            
            rotation={[Math.PI / 2, 0, Math.PI]}
            metalness={0}
            roughness={0.9}
        />
           
        {/* creation of adam */}
        {/* <Picture 
            url={"assets/3D/Hands/scene.gltf"}
            scale={[0.1, 0.1, 0.1]}
            position={[34.7, 12, 12]}            
            rotation={[0, -Math.PI / 2, Math.PI]}
            metalness={0}
            roughness={0.9}
        /> */}

        {/* wedding */}
        {/* <Picture 
            url={"assets/3D/Wedding/scene.gltf"}
            scale={[2.5, 2.5, 2.5]}
            position={[34.7, 7, 25]}            
            rotation={[Math.PI / 2, Math.PI, 0]}
            metalness={0.0}
            roughness={0.3}
        />
         <Display position={[20, 5, 25]} size={[1, 18, 11]} /> */}

        {/* wilson portrait */}
         {/* <Picture 
            url={"assets/3D/Wilson/scene.gltf"}
            scale={[2.5, 2.5, 2.5 ]}
            position={[-34.6, 7, 0]}            
            rotation={[-Math.PI / 2, 0, 0]}
            metalness={0}
            roughness={0.3}
        />
         <Display position={[-20, 5, 0]} size={[1, 18, 11]} /> */}

        {/* old man portrait */}
        {/* <Picture 
            url={"assets/3D/OldMan/scene.gltf"}
            scale={[4, 4, 4]}
            position={[-34.6, 7, 25]}            
            rotation={[0, 0, 0]}
            metalness={0.9}
            roughness={0.9}
        />
         <Display position={[-20, 5, 25]} size={[1, 18, 11]} /> */}

         {/* girl portrait */}
         {/* <Picture 
            url={"assets/3D/Girl/scene.gltf"}
            scale={[6.5, 6.5, 6.5]}
            position={[-34.6, 10, 12]}            
            rotation={[-Math.PI / 2, 0, 0]}
            metalness={0.7}
            roughness={0.8}
        /> */}
         
    </>

    )
  }

  export default Art;