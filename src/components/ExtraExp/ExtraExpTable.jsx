import React, { useEffect, useState } from 'react'

import Table from '../Table/Table';

const ExtraExpTable = ({loadData, formData, setFormData}) => {  
  const columns = React.useMemo(
    () => [      
      { Header: 'Item', accessor: 'item', width:"15%" },
      { Header: 'Price', accessor: 'price', width:"10%" },
      { Header: 'Exp Type', accessor: 'type', width:"10%" },
      { Header: 'Edit',  width:"1%" },
      { Header: 'Delete',  width:"1%" }
    ],[]
  );

  return (
    <div>
        <div className="font-bold">Extra Expenses Table</div>
        <div className='relative overflow-x-auto'>
            <Table columns={columns} formData={formData} setFormData={setFormData} data={loadData} /> 
        </div>
    </div>
  )
}

export default ExtraExpTable