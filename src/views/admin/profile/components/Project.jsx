import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import image1 from "assets/img/profile/image1.png";
import image2 from "assets/img/profile/image2.png";
import image3 from "assets/img/profile/image3.png";
import Card from "components/card";

const Project = () => {
  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Banking Overview
        </h4>
      </div>
      <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="w-full">
          <div className="flex justify-between ">
            <div className="">
              <p className="text-base font-medium text-navy-700 dark:text-white">
                Wells Fargo
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Wells_Fargo_Checking_856
              </p>
            </div>
            <div className="text-right">
              <p className="text-base font-medium text-navy-700 dark:text-white">
                $0
              </p>
              <p className="mt-2 text-sm text-gray-600">Bal</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Type: Checking
            </p>
            <p className="mt-2 text-sm text-gray-600">Updated: Nov 21</p>
          </div>
          <div className="border"></div>
          <div className="flex justify-between ">
            <div className="">
              <p className="mt-2 text-sm text-gray-600">In Eaze</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                $1,177,156.26
              </p>
            </div>
            <div className="text-right">
              <p className="mt-2 text-sm text-gray-600">Uncategorized</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                1005
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Project 1 */}
      <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="w-full">
          <div className="flex justify-between ">
            <div className="">
              <p className="text-base font-medium text-navy-700 dark:text-white">
                Wells Fargo
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Wells_Fargo_Checking_856
              </p>
            </div>
            <div className="text-right">
              <p className="text-base font-medium text-navy-700 dark:text-white">
                $0
              </p>
              <p className="mt-2 text-sm text-gray-600">Bal</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Type: Checking
            </p>
            <p className="mt-2 text-sm text-gray-600">Updated: Nov 21</p>
          </div>
          <div className="border"></div>
          <div className="flex justify-between ">
            <div className="">
              <p className="mt-2 text-sm text-gray-600">In Eaze</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                $1,177,156.26
              </p>
            </div>
            <div className="text-right">
              <p className="mt-2 text-sm text-gray-600">Uncategorized</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                1005
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Project;
