import rank_user
import rank_info

def get_all_trophies(user_id):
    all_ranks = rank_user.get_all_ranks(user_id)

    result_dict = {}
    for key in all_ranks:
        if key == "user_id":
            result_dict["user_id"] = all_ranks["user_id"]

        else:
            points = all_ranks[key]
            product_trophies = []

            for num in range(points, 0, -1):
                rank = rank_info.get_rank_name(num)
                product_trophies.append(rank)

            result_dict[key] = product_trophies

    return result_dict