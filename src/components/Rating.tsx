export default function Rating({rate}: any) {
    
    const stars = new Map();
    stars.set(0, {half: 0, full: 0, empty: 5})
    stars.set(1, {half: 1, full: 0, empty: 4})
    stars.set(2, {half: 0, full: 1, empty: 4})
    stars.set(3, {half: 1, full: 1, empty: 3})
    stars.set(4, {half: 0, full: 2, empty: 3})
    stars.set(5, {half: 1, full: 2, empty: 2})
    stars.set(6, {half: 0, full: 3, empty: 2})
    stars.set(7, {half: 1, full: 3, empty: 1})
    stars.set(8, {half: 0, full: 4, empty: 1})
    stars.set(9, {half: 1, full: 4, empty: 0})
    stars.set(10, {half: 0, full: 5, empty: 0})

    var row = [];
    let rateStars = stars.get(rate)
    for(let i = 0; i < rateStars.full; i++) {
        row.push(
            <svg className="mr-1" fill="#fbbf24" width="16" height="16" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
        );
    }

    for(let i = 0; i < rateStars.half; i++) {
        row.push(
            <svg className="mr-1" fill="#fbbf24" width="16" height="16" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
        );
    }

    for(let i = 0; i < rateStars.empty; i++) {
        row.push(
            <svg className="mr-1" fill="#fbbf24" width="16" height="16" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg> 
        );
    }

    return (
        <div className="flex">
            {row}
        </div>
    );

}