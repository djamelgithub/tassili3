import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

 

const Preciosalaaa = ({Preciosala}) => {
 
    const [precioventa, setPrecioVenta ] = useState([5, 300]);
  
    return (
      <div className='card'>
        <label>
        Prix en Milions centimes
          <Slider
            min={5}
            max={300}
            step={5}
            range
            value={precioventa}
            onChange={(newRange) => {
              setPrecioVenta(newRange);
              Preciosala(newRange); // Llama a la función proporcionada por el prop
            }}
            trackStyle={{ backgroundColor: '#007bff', height: 10 }}
            handleStyle={{
              borderColor: '#007bff',
              height: 20,
              width: 20,
              marginLeft: -10,
              marginTop: -5,
              backgroundColor: '#007bff',
            }}
            railStyle={{ backgroundColor: '#ccc', height: 10 }}
          />
  
          <div style={{ marginTop: 10 }}>
          De {precioventa[0]} à {precioventa[1]} Milions
          </div>
        </label>
      </div>
    );
  };
  
  export default Preciosalaaa