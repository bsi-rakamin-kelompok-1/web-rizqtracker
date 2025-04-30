"use client"


import { useRouter } from "next/navigation";
import { useReceiptTrasferStore } from "@/store/ReceiptTransferStore";




function TableReceiptTransfer() {
  const receiptTransfer = useReceiptTrasferStore();
  

  return (
    <>

       
        <div className="flex flex-row justify-between ">
          <div>
            <p className="mb-5">No. Akun Penerima</p>
            <p className="mb-5">Tipe Transaksi</p>
            <p className="mb-5">Kategori Transfer</p>
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
        {/* {Object.entries(data).filter(([key]) => key !== "id" ).filter(([key]) => key !== "setReceiptTransfer").filter(([key]) => key !== "created_at").filter(([key]) => key !== "transaction_type").map(([key, value]) => (
          <p key={key} className="mb-5">{String(value)}</p>
        ))} */}
         <div className="mb-5">
          {receiptTransfer.recipient_account_number.toString()}          
          </div>
          <div className="mb-5">
          {receiptTransfer.transaction_type === 'topup' ? 'Top Up' : 'Transfer'}          
          </div>
          <div className="mb-5">
          {receiptTransfer.transfer_category === 'needs' ? 'Kebutuhan' : 
            receiptTransfer.transfer_category === 'bills' ? 'Tagihan' :
            receiptTransfer.transfer_category === 'shopping' ? 'Belanja' :
            receiptTransfer.transfer_category === 'transport' ? 'Transportasi' :
            'Transfer Kekayaan'
          }          
          </div>
          <div className="mb-5">
          {receiptTransfer.amount.toString()}          
          </div>
          <div className="mb-5">
          {receiptTransfer.notes}          
          </div>
          <div className="mb-5">
          {receiptTransfer.reference_number}          
          </div>
          </div>
         
        </div>
    </>
  );
}

export default TableReceiptTransfer;
