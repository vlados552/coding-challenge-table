import React, { useState, useEffect } from "react";
import axios from "axios";
import InputSearch from "./InputSearch";
import InputSelect from "./InputSelect";
import Pagination from "../Pagination/Pagination";
import {
  CrossSvg,
  FileSVG,
  ReverseSvg,
  CheckSvg,
  ArrowUpSvg,
  ArrowDownSvg,
} from "../../images/SVGAssets";

const InvoiceList = () => {
  const DefaultPic = require("../../images/defaultPic.png");

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedSCategory] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [serchInovice, setSerchInovice] = useState("");
  const [searchedInvoices, setSearchedInvoices] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState({});
  const [sortInovice, setSortInovice] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const InvoicePerPage = 7;

  const statusOptions = [
    { label: "Paid", value: "Paid" },
    { label: "Refunded", value: "Refunded" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  const statusCategory = [{ label: "All", value: "All" }];
  /// select
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    const newSelectedInvoices = {};
    filteredInvoices.forEach(({ id }) => {
      newSelectedInvoices[id] = e.target.checked;
    });
    setSelectedInvoices(newSelectedInvoices);
  };

  const handleSelectInvoice = (invoiceId) => {
    const newSelectedInvoices = {
      ...selectedInvoices,
      [invoiceId]: !selectedInvoices[invoiceId],
    };
    setSelectedInvoices(newSelectedInvoices);
  };
  /// fetch data
  useEffect(() => {
    const fetchInovices = async () => {
      try {
        const { data } = await axios.get(
          "https://api.jsonbin.io/v3/b/67069e97e41b4d34e43fd8e6"
        );
        setInvoices(data.record);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInovices();
  }, []);

  /// Search
  useEffect(() => {
    if (serchInovice === "") {
      setFilteredInvoices(invoices);
    } else {
      const searchInvoices = invoices.filter(({ invoice }) =>
        invoice.toLowerCase().includes(serchInovice.toLowerCase())
      );
      setSearchedInvoices(searchInvoices);
      setFilteredInvoices(searchInvoices);
    }
  }, [serchInovice, invoices]);

  /// Filter by status
  useEffect(() => {
    if (selectedStatus === "") {
      setFilteredInvoices(
        searchedInvoices.length > 0 ? searchedInvoices : invoices
      );
    } else {
      const filteredInvoices = (
        searchedInvoices.length > 0 ? searchedInvoices : invoices
      ).filter(({ status }) => status === selectedStatus);
      setFilteredInvoices(filteredInvoices);
      setCurrentPage(1);
    }
  }, [invoices, selectedStatus, searchedInvoices]);

  //// sorting
  useEffect(() => {
    const sortedData = [...invoices].sort((a, b) => {
      return sortInovice === "asc"
        ? a.invoice.localeCompare(b.invoice)
        : b.invoice.localeCompare(a.invoice);
    });
    setFilteredInvoices(sortedData);
  }, [invoices, sortInovice]);

  /// pagination
  const totalPages = Math.ceil(filteredInvoices.length / InvoicePerPage);
  const startIndex = (currentPage - 1) * InvoicePerPage;
  const currentInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + InvoicePerPage
  );

  return (
    <div className="container mx-xl px-30 mx-auto">
      <div className="grid grid-cols-3 gap-3 items-center mb-52px">
        <InputSearch
          setSerchInovice={setSerchInovice}
          serchInovice={serchInovice}
        />
        <InputSelect
          label="Status"
          selectedOption={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          options={statusOptions}
        />
        <InputSelect
          label="Category"
          selectedOption={selectedCategory}
          onChange={(e) => setSelectedSCategory(e.target.value)}
          options={statusCategory}
        />
      </div>
      <table className="min-w-full rounded-lg overflow-hidden table-fixed mb-6">
        <thead>
          <tr className="bg-customBgTable border-2 border-customBorder items-start">
            <th className=" w-12 h-12">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th
              className="pl-6 flex gap-2 items-center cursor-pointer"
              onClick={() =>
                setSortInovice(sortInovice === "asc" ? "desc" : "asc")
              }
            >
              <h3 className="color-customGray font-montserrat font-normal font-medium text-left text-xs py-3">
                Invoice
              </h3>
              {sortInovice === "asc" ? <ArrowDownSvg /> : <ArrowUpSvg />}
            </th>
            <th className="color-customGray font-montserrat font-normal font-medium text-left text-xs py-3 pl-6">
              Date
            </th>
            <th className="color-customGray font-montserrat font-normal font-medium text-left text-xs py-3 pl-6">
              Status
            </th>
            <th className="color-customGray font-montserrat font-normal font-medium text-left text-xs py-3 pl-6">
              Customer
            </th>
            <th className="color-customGray font-montserrat font-normal font-medium text-left text-xs py-3 pl-6">
              Purchase
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {currentInvoices.map(
            ({ customer, invoice, date, status, purchase, id }) => (
              <tr className="border-2 border-customBorder" key={id}>
                <td className="px-6">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selectedInvoices[id] || false}
                    onChange={() => handleSelectInvoice(id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-13px">
                    <FileSVG />
                    <h3 className="text-sm font-montserrat text-customText">
                      {invoice}
                    </h3>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-customBlack">
                  {date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`px-1.5 py-0.5 inline-flex gap-1 items-center text-xs leading-5 font-semibold rounded-full border ${
                      status === "Paid"
                        ? "text-customGreenDark border-customGreenDark"
                        : status === "Refunded"
                        ? "text-customBlack border-customBlack"
                        : "text-customRed border-customRed"
                    } `}
                  >
                    {status === "Paid" ? (
                      <CheckSvg />
                    ) : status === "Refunded" ? (
                      <ReverseSvg />
                    ) : (
                      <CrossSvg />
                    )}
                    <h4>{status}</h4>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-8 w-8 rounded-full border border-customBlackLight flex-shrink-0"
                      src={customer.avatar ? customer.avatar : DefaultPic}
                      alt={customer.name}
                    />
                    <div>
                      <h4 className="text-sm font-inter text-customColorName font-medium">
                        {customer.name}
                      </h4>
                      <h4 className="text-sm text-customBlack font-medium">
                        {customer.email}
                      </h4>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-customBlack">
                  {purchase}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className=" flex gap-3">
                    <a
                      href="#"
                      className="text-customBlack hover:text-blue-400"
                    >
                      Archive
                    </a>
                    <a href="#" className="text-customBlue hover:text-blue-900">
                      Download
                    </a>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default InvoiceList;
