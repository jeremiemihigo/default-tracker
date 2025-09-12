"use client";

import HeaderComponent from "@/app/header/Header";
import AddCustomer from "./AddCustomers";
import Refresh from "./Refresh";

function Pagerefresh() {
  return (
    <HeaderComponent title="Add or refresh customers PAR 120+">
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          {/* Upload Refresh */}
          <div className="w-full">
            <Refresh />
          </div>

          {/* Upload Add Customer */}
          <div className="w-full">
            <AddCustomer />
          </div>
        </div>
      </div>
    </HeaderComponent>
  );
}

export default Pagerefresh;
