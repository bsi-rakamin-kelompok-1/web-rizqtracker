"use client"


import { useRouter } from "next/navigation";
import { useReceiptTopupStore } from "@/store/ReceiptTopupStore";



function TableReceipt() {
  const receiptTopupStore = useReceiptTopupStore();
  

  return (
    <>

       
        <div className="flex flex-row justify-between ">
          <div>
            <p className="mb-5">Tipe Transaksi</p>
            <p className="mb-5">Metode Top up</p>
            <p className="mb-5">Nominal</p>
            <p className="mb-5">Catatan</p>
            <p className="mb-5">Nomor Referensi</p>
            

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
        {/* {Object.entries(data).filter(([key]) => key !== "id" ).filter(([key]) => key !== "setReceiptTopup").filter(([key]) => key !== "created_at").filter(([key]) => key !== "transaction_type").map(([key, value]) => (
          <p key={key} className="mb-5">{String(value)}</p>
        ))} */}
            <div className="mb-5">
              {receiptTopupStore.transaction_type === 'topup' ? 'Top Up' : 'Transfer'}
            </div>
            <div className="mb-5">
              {receiptTopupStore.topup_method === 'credit_card' ? 'Kartu Kredit' : receiptTopupStore.topup_method === 'debit_card' ? 'Kartu Debit' : 'Transfer Bank'}
            </div>
            <div className="mb-5">
              {receiptTopupStore.amount.toString()}
            </div>
            <div className="mb-5">
              {receiptTopupStore.notes}
            </div>
            <div className="mb-5">
              {receiptTopupStore.reference_number}
            </div>
          </div>
        </div>
    </>
  );
}

export default TableReceipt;
