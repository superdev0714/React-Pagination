getPaginationItems(totalPageCount, prevLink, nextLink) {

    let paginationItemSize = 9; //item count including ellipsis, next...
    const { selectedVoiceAppIndex } = this.props;
    let voiceAppIndex = selectedVoiceAppIndex;
    if (voiceAppIndex > totalPageCount - 1) {
      voiceAppIndex = 0;
    }
    let ellipsisItem1 = '';
    let ellipsisItem2 = '';
    let retVal = [];
    ellipsisItem1 = <PaginationItem key={-111} ><div className="Home-pagination-ellipsis">&nbsp;...&nbsp;</div></PaginationItem>;
    ellipsisItem2 = <PaginationItem key={-222} ><div className="Home-pagination-ellipsis">&nbsp;...&nbsp;</div></PaginationItem>;
    if (paginationItemSize === 11) {
      retVal.push(
        <PaginationItem key = {-11} disabled={ prevLink === '' }>
          <PaginationLink onClick={e => this.handlePageChange(e, 0)} first />
        </PaginationItem>
      );
    }
    retVal.push(
      <PaginationItem key = {-1} disabled={ prevLink === '' }>
        <PaginationLink onClick={e => this.handlePageChange(e, voiceAppIndex - 1)} previous />
      </PaginationItem>
    );
    if (totalPageCount <= paginationItemSize - 1) {
      for (let i = 0; i < totalPageCount; i++) {
        retVal.push(
          <PaginationItem key={i} active={i === voiceAppIndex}>
            <PaginationLink onClick={e => this.handlePageChange(e, i)}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>);
      }
    } else {
      // first 2 items
      for (let i = 0; i < 2; i++) {
        retVal.push(
          <PaginationItem key={i} active={i === voiceAppIndex}>
            <PaginationLink onClick={e => this.handlePageChange(e, i)}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>);
      }
      // 3th item
      if (voiceAppIndex >= Math.floor(paginationItemSize / 2)) {
        retVal.push(ellipsisItem1);
      } else {
        retVal.push(
          <PaginationItem key={2} active={2 === voiceAppIndex}>
            <PaginationLink onClick={e => this.handlePageChange(e, 2)}>
              {3}
            </PaginationLink>
          </PaginationItem>);
      }
      //(4th~8th) = item is 11 AND (4th~6th) = item is 9
      if (paginationItemSize ===11) {
        let startIndex = 3;
        if (voiceAppIndex === 5 || voiceAppIndex === 6) {
          startIndex = 5;
        } else if (voiceAppIndex >= totalPageCount - 5) {
          startIndex = totalPageCount - 8;
        } else if (voiceAppIndex >= 0 && voiceAppIndex < 5) {
          startIndex = 3;
        } else {
          startIndex = voiceAppIndex - 2;
        }
        for (let i = startIndex; i <= startIndex + 4; i++) {
          retVal.push(
            <PaginationItem key={i} active={i === voiceAppIndex}>
              <PaginationLink onClick={e => this.handlePageChange(e, i)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>);
        }
      } else {
        let startIndex = 3;
        if (voiceAppIndex === 4) {
          startIndex = 3;
        } else if (voiceAppIndex >= totalPageCount - 5) {
          startIndex = totalPageCount - 6;
        } else if (voiceAppIndex >= 0 && voiceAppIndex < 4) {
          startIndex = 3;
        } else {
          startIndex = voiceAppIndex - 1;
        }
        for (let i = startIndex; i <= startIndex + 2; i++) {
          retVal.push(
            <PaginationItem key={i} active={i === voiceAppIndex}>
              <PaginationLink onClick={e => this.handlePageChange(e, i)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>);
        }
      }
      /////////////
      if (paginationItemSize === 11) {
        if (voiceAppIndex >= totalPageCount - 5) {
          retVal.push(
            <PaginationItem key={8} active={totalPageCount - 3 === voiceAppIndex}>
              <PaginationLink onClick={e => this.handlePageChange(e, totalPageCount - 3)}>
                {totalPageCount - 2}
              </PaginationLink>
            </PaginationItem>);

        } else {
          retVal.push(ellipsisItem2);
        }
        retVal.push(
          <PaginationItem key={9} active={totalPageCount - 2 === voiceAppIndex}>
            <PaginationLink onClick={e => this.handlePageChange(e, totalPageCount - 2)}>
              {totalPageCount - 1}
            </PaginationLink>
          </PaginationItem>);

        retVal.push(
          <PaginationItem key={10} active={totalPageCount - 1 === voiceAppIndex}>
            <PaginationLink onClick={e => this.handlePageChange(e, totalPageCount - 1)}>
              {totalPageCount}
            </PaginationLink>
          </PaginationItem>);
      } else {
        if (voiceAppIndex >= totalPageCount - 4) {
          retVal.push(
            <PaginationItem key={6} active={totalPageCount - 3 === voiceAppIndex}>
              <PaginationLink onClick={e => this.handlePageChange(e, totalPageCount - 3)}>
                {totalPageCount - 2}
              </PaginationLink>
            </PaginationItem>);

        } else {
          retVal.push(ellipsisItem2);
        }
        retVal.push(
          <PaginationItem key={7} active={totalPageCount - 2 === voiceAppIndex}>
            <PaginationLink onClick={e => this.handlePageChange(e, totalPageCount - 2)}>
              {totalPageCount - 1}
            </PaginationLink>
          </PaginationItem>);

        retVal.push(
          <PaginationItem key={8} active={totalPageCount - 1 === voiceAppIndex}>
            <PaginationLink onClick={e => this.handlePageChange(e, totalPageCount - 1)}>
              {totalPageCount}
            </PaginationLink>
          </PaginationItem>);
      }
    }
    //next
    retVal.push(
      <PaginationItem key = {9999999} disabled={ nextLink === '' }>
        <PaginationLink onClick={e => this.handlePageChange(e, voiceAppIndex + 1)} next />
      </PaginationItem>
    );
    if (paginationItemSize === 11) {
      //last
      retVal.push(
        <PaginationItem key = {-999999} disabled={ nextLink === '' }>
          <PaginationLink onClick={e => this.handlePageChange(e, totalPageCount - 1)} last />
        </PaginationItem>
      );
    }
    return retVal;
  }

  handlePageChange(e, index) {
    e.preventDefault();
    this.props.updateApps(null, null, index, '', false);
  }