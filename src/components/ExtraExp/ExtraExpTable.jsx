import React from 'react'
import Table from '../Table/Table';

const ExtraExpTable = () => {
    const data = React.useMemo(
        () => [
          { id: 1, item: 'John Doe', amount: 28 },
          { id: 2, item: 'Jane Smith', amount: 32 }
        ],
        []
      );
    const columns = React.useMemo(
        () => [
          { Header: 'ID', accessor: 'id' },
          { Header: 'Item', accessor: 'item' },
          { Header: 'Amount', accessor: 'amount' },
        ],
        []
      );

  return (
    <div>
        <div>ExtraExpTable</div>
        <div>
            <Table columns={columns} data={data} /> 
        </div>
    </div>
  )
}

export default ExtraExpTable