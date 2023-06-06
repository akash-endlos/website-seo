import { useState } from 'react';
import { Tbody, Td, Tr, Button } from "@chakra-ui/react";

const TableBody = ({ headerNames, paginatedData, renderAction }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRowExpansion = (rowIndex) => {
    setExpandedRows((prevState) => {
      if (prevState.includes(rowIndex)) {
        return prevState.filter((row) => row !== rowIndex);
      } else {
        return [...prevState, rowIndex];
      }
    });
  };

  const isRowExpanded = (rowIndex) => {
    return expandedRows.includes(rowIndex);
  };

  return (
    <Tbody>
      {paginatedData.map((row, rowIndex) => (
        <Tr key={rowIndex}>
          {headerNames.map((header, colIndex) => {
            if (header === 'Action') {
              return <Td key={colIndex}>{renderAction(row)}</Td>;
            }
            if (header === 'headTag') {
              return (
                <Td className="card" key={colIndex}>
                  <div>
                  <div className='flex flex-col'>
                      {`${row[header].slice(0, 50)}...`}
                      {row[header].length > 50 && !isRowExpanded(rowIndex) && (
                        <Button
                          size="sm"
                          onClick={() => toggleRowExpansion(rowIndex)}
                        >
                          Show More
                        </Button>
                      )}
                    </div>
                    {isRowExpanded(rowIndex) && (
                      <div className='flex flex-col'>
                        {row[header]}
                        <Button
                          size="sm"
                          onClick={() => toggleRowExpansion(rowIndex)}
                        >
                          Show Less
                        </Button>
                      </div>
                    )}
                  </div>
                </Td>
              );
            }
            return <Td key={colIndex}>{row[header]}</Td>;
          })}
        </Tr>
      ))}
    </Tbody>
  );
};

export default TableBody;
