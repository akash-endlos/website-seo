import { useState } from 'react';
import { Tbody, Td, Tr, Button, Text } from "@chakra-ui/react";

const TableBody = ({ headerNames, paginatedData, renderAction }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRowExpansion = (rowIndex) => {
    setExpandedRows((prevExpandedRows) => {
      const updatedExpandedRows = [...prevExpandedRows];
      if (updatedExpandedRows.includes(rowIndex)) {
        // Row is already expanded, so collapse it
        const indexToRemove = updatedExpandedRows.indexOf(rowIndex);
        updatedExpandedRows.splice(indexToRemove, 1);
      } else {
        // Row is not expanded, so expand it
        updatedExpandedRows.push(rowIndex);
      }
      return updatedExpandedRows;
    });
  };

  return (
    <Tbody>
      {paginatedData.map((row, rowIndex) => {
        const isExpanded = expandedRows.includes(rowIndex);

        return (
          <Tr key={rowIndex}>
            {headerNames.map((header, colIndex) => {
              if (header === 'Action') {
                return <Td key={colIndex}>{renderAction(row)}</Td>;
              }
              if (header === 'headTag') {
                const rowData = row[header];
              const shouldShowButton = rowData.length > 100;
              const displayedText = shouldShowButton ? (isExpanded ? rowData : rowData.slice(0, 100) + '...') : rowData;

                return (
                  <Td className="card" key={colIndex}>
                    <div>
                      <div className='flex flex-col'>
                        <Text>{displayedText}</Text>
                        {shouldShowButton && (
                          <div>
                            <Button onClick={() => toggleRowExpansion(rowIndex)}>
                              {isExpanded ? 'Read less' : 'Read more'}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Td>
                );
              }
              return <Td key={colIndex}>{row[header]}</Td>;
            })}
          </Tr>
        );
      })}
    </Tbody>
  );
};

export default TableBody;
