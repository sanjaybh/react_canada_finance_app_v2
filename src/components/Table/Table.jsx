import { FaAddressCard, FaBackspace } from "react-icons/fa";

import { useTable } from 'react-table';

const Table = ({ columns, data, formData, setFormData, setReqType }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    });
    const trClassHeader = "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    const tdClassHeader = "px-2 py-2 font-bolder font-medium text-gray-900 whitespace-nowrap dark:text-white"
    const trClassBody = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-neutral-100"
    const tdClassBody = "px-2 py-2"

    const handleRowClick = function(e, row){
      //console.log(row);
      setReqType("UPDATE_REQUEST")
      setFormData(row.original)
    }

    const handleCellClick = function(e, cell){
      const renCell = cell.column.render('Header')
      if(renCell === "Edit"){
        console.log("edit")
      } else if(renCell === "Delete"){
        console.log("delete")
      }
    }
    
    const renderModifiers = function(cell){
      const renCell = cell.column.render('Header')
      if(renCell === "Edit"){
        return <FaAddressCard size='1.7rem'/>
      } else if(renCell === "Delete"){
        return <FaBackspace size='1.7rem'/>
      }else {
        return cell.render('Cell');
      }      
    }
    
    return (
      <table {...getTableProps()} className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className={trClassHeader}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} width={column.render('width')} className={tdClassHeader}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={trClassBody} onClick={(e)=>handleRowClick(e, row)}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className={tdClassBody} onClick={(e)=>handleCellClick(e, cell)}>
                     {renderModifiers(cell)}
                     {/* {cell.render('Cell')} */}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  export default Table;