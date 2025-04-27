"use client"


import { useRouter } from "next/navigation";



type Transacstion = {
  id: BigInteger
  amount: BigInteger
  name: string
  typeTransaction: string
  categoryTransfer: string
  referenceNumber: string
  note: string
}

interface DataTableProps {
  data: Transacstion[]
}

function TableReceipt({ data }: DataTableProps) {
  
  

  return (
    <>

       
        <div className="flex flex-row justify-between ">
          <div>
            <p className="mb-5">Nominal</p>
            <p className="mb-5">Nama Penerima</p>
            <p className="mb-5">Tipe Transaksi</p>
            <p className="mb-5">Kategori Transfer</p>
            <p className="mb-5">Nomor Referensi</p>
            <p className="mb-5">Catatan</p>

          </div>
          <div>
            {/* {data.map((transacstion) => (
          <TableRow key={transacstion.id}>
            <TableCell>{transacstion.amount}</TableCell>
            <TableCell>{transacstion.name}</TableCell>
            <TableCell>{transacstion.typeTransaction}</TableCell>
            <TableCell>{transacstion.categoryTransfer}</TableCell>
            <TableCell>{transacstion.referenceNumber}</TableCell>
            <TableCell>{transacstion.note}</TableCell>
              <TableCell className="font-medium capitalize">{transacstion.('_', ' ')}</TableCell>
              <TableCell>{transacstion.amount}</TableCell>
            </TableRow>
  
        ))} */}
        {Object.entries(data).filter(([key]) => key !== "id").map(([key, value]) => (
          <p key={key} className="mb-5">{String(value)}</p>
        ))}
          </div>
        </div>
    </>
  );
}

export default TableReceipt;
