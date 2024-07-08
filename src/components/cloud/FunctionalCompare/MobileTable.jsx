import { useEffect, useState } from "preact/hooks";
import Correct from "./Correct";
import False from "./False";

const MobileTable = (props) => {
  const { dataSource, title, version } = props;

  return (
    <div class="overflow-x-auto rounded-2xl mb-6">
      <table class="table bg-secondary rounded-2xl table-fixed">
        {
          dataSource.map((item, index) => {
            return (
              <>
                {index === 0 && <tr>
                  <td class="text-xl align-top text-left border-dotted border-b border-link border-x-0 " colspan={2}>
                    {title}
                  </td>
                </tr>}
                <tr>
                  <td class="text-base font-normal text-neutral border-l-0 border-link">
                    {item.name.title && <p>{item.name.title}</p>}
                    {item.name.des && <p class="text-xs">{item.name.des}</p>}
                  </td>
                  <td class="text-center border-r-0 border-link">
                    {typeof item[version]?.checked === 'boolean' && <p>
                        {item[version]?.checked ? <Correct /> : <False />}
                      </p>}
                    {item[version]?.des && (
                      <p class="text-xs font-normal text-warning">
                        {item[version]?.des}
                      </p>
                    )}
                  </td>
                </tr>
              </>
            );
          })
        }
      </table>
    </div>
  );
};

export default MobileTable;