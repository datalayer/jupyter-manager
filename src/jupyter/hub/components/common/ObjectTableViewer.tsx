import { Label, RelativeTime } from '@primer/react';
import { Table, DataTable } from '@primer/react/drafts';

type DataObject = Record<string, any>;

type DataKey = keyof DataObject;

const ObjectTableViewer = (props: {
  data: any;
  title: string;
}): JSX.Element => {
  const opt = props;

  const data: DataObject = opt.data;
  const title: string = opt.title;

  const tableData = Object.entries(data).map(([key, value], index) => {
    return { id: index, key: key as DataKey };
  });

  return (
    <Table.Container>
      <Table.Title as="h2" id="repositories">
        {title}
      </Table.Title>
      <DataTable
        aria-labelledby="repositories"
        aria-describedby="repositories-subtitle"
        data={tableData}
        columns={[
          {
            header: 'Property',
            field: 'key',
            renderCell: row => {
              return <b>{row.key}</b>;
            },
            width: '100px'
          },
          {
            header: 'Value',
            field: 'id',
            renderCell: row => {
              const key = row.key;
              const value = data[key];
              let valueElement;
              if (key === 'created' || key === 'last_activity') {
                valueElement = value ? (
                  <RelativeTime date={new Date(value)} />
                ) : (
                  <>never</>
                );
              } else if (Array.isArray(value) && typeof value[0] === 'string') {
                valueElement = (
                  <>
                    {value.map((value: string, index: number) => (
                      <Label sx={{ mr: 1 }} key={index}>
                        {value}
                      </Label>
                    ))}
                  </>
                );
              } else if (
                value &&
                !Array.isArray(value) &&
                typeof value === 'object'
              ) {
                if (Object.keys(value).length === 0) {
                  valueElement = <></>;
                } else {
                  valueElement = <>{JSON.stringify(value)}</>;
                }
              } else {
                valueElement = <>{value}</>;
              }
              return valueElement;
            },
            width: 'grow'
          }
        ]}
      />
    </Table.Container>
  );
};

export default ObjectTableViewer;
